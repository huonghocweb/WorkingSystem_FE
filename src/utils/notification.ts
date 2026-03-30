import toast from "react-hot-toast"

type ToastType  = 'success' | 'error' | 'warning' |  'info'

export const showWToast = (type : ToastType , message :string) => {
    switch(type) { 
        case 'success' : 
        toast.success(message ,{
            style: { border: '1px solid #4ade80', padding: '16px', color: '#14532d' },
        });
        break;
        case 'error' : 
        toast.error(message , {
            style: { border: '1px solid #f87171', padding: '16px', color: '#7f1d1d' },
        }) ;
        break;
        case 'warning' : 
        toast(message, {
            icon: '⚠️',
        style: { border: '1px solid #fbbf24', padding: '16px', color: '#78350f' },
        });
        break;
        default:
        toast(message);

    }
}