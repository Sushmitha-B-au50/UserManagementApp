import {toast } from 'react-toastify';


export const showToastMessage = (Message) => {
    toast.error(Message, {
        position: toast.POSITION.TOP_CENTER
    });
};
export const showInfoToastMessage = (Message) => {
    toast.info(Message, {
        position: toast.POSITION.TOP_CENTER
    });
};