import React, { useReducer, useCallback } from 'react';

const initialState = {
  photoUrlList: [],
  photo: null,
  uploading: false,
  uploadError: false,
  downloading: false,
  downloadError: null,
  commented: false,
  commentError: null,
  liked: false,
  likeError: null,
};

const contractReducer = (currentState, action) => {
  switch (action.type) {
    case 'DOWNLOAD_START':
      return {
        ...currentState,
        downloading: true,
      };
    case 'DOWNLOAD_FAIL':
      return {
        ...currentState,
        downloading: false,
        downloadError: action.error,
      };
    case 'UPLOAD_START':
      return {
        ...currentState,
        uploading: true,
      };
    case 'UPLOAD_FAIL':
      return {
        ...currentState,
        uploading: false,
        uploadError: action.error,
      };
    case 'GET_PHOTO_SUCCESS':
      return {
        ...currentState,
        photo: action.photo,
      };
    case 'ADD_LIST':
      return {
        ...currentState,
        photoUrlList: action.photoUrlList,
      };
    case 'UPLOAD_CLEAR':
      return {
        ...currentState,
        uploadError: null,
      };
    case 'DOWNLOAD_CLEAR':
      return { ...currentState, downloadError: null };
    case 'COMMENT_SUCESS':
      return { ...currentState, commented: true };
    case 'COMMENT_FAIL':
      return { ...currentState, commentError: action.error };
    case 'COMMENT_CLEAR':
      return { ...currentState, commented: false, commentError: null };
    case 'LIKE_SUCCESS':
      return { ...currentState, liked: true };
    case 'LIKE_FAIL':
      return { ...currentState, likeError: action.error };
    case 'LIKE_CLEAR':
      return { ...currentState, liked: false, commentError: null };
    default:
      return initialState;
  }
};

export const PhotoContext = React.createContext(initialState);

const PhotoProvider = ({ children }) => {
  const [state, dispatchState] = useReducer(contractReducer, initialState);

  const downloadPhoto = useCallback(() => {}, []);

  const uploadPhoto = useCallback(() => {}, []);

  const sendComment = useCallback(() => {}, []);

  const sendLiked = useCallback(() => {}, []);

  const value = {
    photoUrlList: state.photoUrlList,
    photo: state.photo,
    uploading: state.uploading,
    uploadError: state.uploadError,
    downloading: state.downloading,
    downloadError: state.downloadError,
    commented: state.commented,
    commentError: state.commentError,
  };

  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
};

export default PhotoProvider;
