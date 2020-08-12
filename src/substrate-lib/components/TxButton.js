import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSubstrate } from '../';
import utils from '../utils';

function TxButton({
  accountPair = null,
  label,
  setStatus = null,
  color = 'blue',
  style = null,
  type = 'QUERY',
  attrs = null,
  disabled = false,
  preop = null,
  setLikes,
  setComments,
  comments,
  likes,
  remark,
  labelDone,
}) {
  // Hooks
  const {
    api,
    profile,
    clearUrl,
    clearPhoto,
    upload,
    setName,
    setAvatar,
  } = useSubstrate();
  const [unsub, setUnsub] = useState(null);
  const [loading, setLoading] = useState(false);
  const { palletRpc, callable, inputParams, paramFields } = attrs;

  const isQuery = () => type === 'QUERY';

  const isUnsigned = () => type === 'UNSIGNED-TX';
  const isSigned = () => type === 'SIGNED-TX';
  const isRpc = () => type === 'RPC';
  const isConstant = () => type === 'CONSTANT';

  const getFromAcct = async () => {
    let fromAcct = accountPair;

    return fromAcct;
  };

  const txResHandler = ({ status }) => {
    status.isFinalized
      ? setStatus(
          `😉 Finalized. Block hash: ${status.asFinalized
            .toString()
            .slice(0, 8)}`
        )
      : setStatus(`Current transaction status: ${status.type}`);
    console.log(status.type);
    if (status.type == 'InBlock') setLoading('done');
  };

  const txErrHandler = (err) => {
    setStatus(`😞 Transaction Failed: ${err.toString()}`);
    setLoading('done');
  };

  const signedTx = async () => {
    const fromAcct = await getFromAcct();
    const transformed = transformParams(paramFields, inputParams);
    // transformed can be empty parameters

    console.log(transformed);
    console.log(api.tx[palletRpc][callable]);
    const txExecute = transformed
      ? api.tx[palletRpc][callable](...transformed)
      : api.tx[palletRpc][callable]();

    const unsub = await txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
    setUnsub(() => unsub);
    if (callable === 'updateUser') {
      setName(profile.nickname);
      setAvatar(profile.avatar);
      window.localStorage.setItem('shinedMe:created::name', profile.nickname);
      window.localStorage.setItem('shinedMe:created::avatar', profile.avatar);
    }
    if (upload.photo) {
      clearPhoto();
      clearUrl();
    }
    if (setLikes) {
      setLikes(likes + 1);
    }
    if (setComments) {
      setComments([...comments, remark]);
    }
  };

  const unsignedTx = async () => {
    const transformed = transformParams(paramFields, inputParams);
    // transformed can be empty parameters
    const txExecute = transformed
      ? api.tx[palletRpc][callable](...transformed)
      : api.tx[palletRpc][callable]();

    const unsub = await txExecute.send(txResHandler).catch(txErrHandler);
    setUnsub(() => unsub);
  };

  const queryResHandler = (result) =>
    result.isNone ? setStatus('None') : setStatus(result.toString());

  const query = async () => {
    const transformed = transformParams(paramFields, inputParams);
    const unsub = await api.query[palletRpc][callable](
      ...transformed,
      queryResHandler
    );
    console.log(transformParams);
    console.log(paramFields);
    console.log(inputParams);
    setUnsub(() => unsub);
  };

  const rpc = async () => {
    const transformed = transformParams(paramFields, inputParams, {
      emptyAsNull: false,
    });
    const unsub = await api.rpc[palletRpc][callable](
      ...transformed,
      queryResHandler
    );
    setUnsub(() => unsub);
  };

  const constant = () => {
    const result = api.consts[palletRpc][callable];
    result.isNone ? setStatus('None') : setStatus(result.toString());
  };

  const transaction = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (preop) {
      await preop();
    }
    if (unsub) {
      unsub();
      setUnsub(null);
    }

    setStatus('Sending...');

    (isSigned() && signedTx()) ||
      (isUnsigned() && unsignedTx()) ||
      (isQuery() && query()) ||
      (isRpc() && rpc()) ||
      (isConstant() && constant());
  };

  const transformParams = (
    paramFields,
    inputParams,
    opts = { emptyAsNull: true }
  ) => {
    console.log(paramFields);
    console.log(inputParams);
    // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
    //   Otherwise, it will not be added
    const paramVal = inputParams.map((inputParam) =>
      typeof inputParam === 'object'
        ? inputParam.value.trim()
        : inputParam.trim()
    );
    const params = paramFields.map((field, ind) => ({
      ...field,
      value: paramVal[ind] || null,
    }));

    return params.reduce((memo, { type = 'string', value }) => {
      if (value == null || value === '')
        return opts.emptyAsNull ? [...memo, null] : memo;

      let converted = value;

      // Deal with a vector
      if (type.indexOf('Vec<') >= 0) {
        converted = converted.split(',').map((e) => e.trim());
        converted = converted.map((single) =>
          isNumType(type)
            ? single.indexOf('.') >= 0
              ? Number.parseFloat(single)
              : Number.parseInt(single)
            : single
        );
        return [...memo, converted];
      }

      // Deal with a single value
      if (isNumType(type)) {
        converted =
          converted.indexOf('.') >= 0
            ? Number.parseFloat(converted)
            : Number.parseInt(converted);
      }
      return [...memo, converted];
    }, []);
  };

  const isNumType = (type) =>
    utils.paramConversion.num.some((el) => type.indexOf(el) >= 0);

  const allParamsFilled = () => {
    if (paramFields.length === 0) {
      return true;
    }

    return paramFields.every((paramField, ind) => {
      const param = inputParams[ind];
      if (paramField.optional) {
        return true;
      }
      if (param == null) {
        return false;
      }

      const value = typeof param === 'object' ? param.value : param;
      return value !== null && value !== '';
    });
  };

  return (
    <div style={style}>
      {loading === true ? (
        <img src="grid.svg" alt="" width="40" />
      ) : (
        <button
          color={color}
          type="submit"
          onClick={transaction}
          disabled={
            disabled || !palletRpc || !callable || !allParamsFilled() || loading
          }
          className="shined-me"
        >
          {loading === 'done' ? labelDone || label : label}
        </button>
      )}
    </div>
  );
}

// prop typechecking
TxButton.propTypes = {
  accountPair: PropTypes.object,
  setStatus: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'QUERY',
    'RPC',
    'SIGNED-TX',
    'UNSIGNED-TX',
    'SUDO-TX',
    'UNCHECKED-SUDO-TX',
    'CONSTANT',
  ]).isRequired,
  attrs: PropTypes.shape({
    palletRpc: PropTypes.string,
    callable: PropTypes.string,
    inputParams: PropTypes.array,
    paramFields: PropTypes.array,
  }).isRequired,
};

export { TxButton };
