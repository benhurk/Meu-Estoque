import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";

import DownloadBtn from "../DownloadBtn";
import LoadBtn from "../LoadBtn";

import abstractSwitch from "../../utils/abstractSwitch";

export default function Header() {
    const listItems = useSelector((state: RootState) => state.list.items);
    const warnedItems = listItems.filter(item => item.quantity <= item.alertQuantity);

    const [sendTo, setSendTo] = useState<string>(localStorage.getItem('send-to') || '');

    useEffect(() => {
        localStorage.setItem('send-to', sendTo);
    }, [sendTo])


    const sendAll = () => {
        let message = '';
    
        listItems.forEach(item => {
            const abstractQuantity = abstractSwitch(item);
    
            const itemMessage = `*• ${item.quantity <= item.alertQuantity ? '❗' : '✅'} ${item.name}:* ${item.qtdType === 'unity' ? item.quantity : abstractQuantity} ${item.qtdType === 'unity' ? 'unidades' : ''}%0a`;
    
            message += itemMessage;
        })
    
        const url = `whatsapp://send?phone=${sendTo}&text=${message}`;
        window.open(url);
    }

    const sendImportant = () => {
        let message = '❗ *Precisa de: ❗*%0a%0a';
    
        warnedItems.forEach(item => {
            const abstractQuantity = abstractSwitch(item);
    
            const itemMessage = `*• ${item.name}* (${item.qtdType === 'unity' ? item.quantity + ' unidades' : abstractQuantity})%0a`;
    
            message += itemMessage;
        })
    
        const url = `whatsapp://send?phone=${sendTo}&text=${message}`;
        window.open(url);
    }

    return (
        <header className="container py-4 bg-primary">
            <h1 className="text-center text-light">Eztoque</h1>
            <div className="dropdown">
                <button type="button" className="btn text-light fs-1 d-block mx-auto" data-toggle="modal" data-target="#options-menu">
                    <i className="bi bi-list" />
                </button>
            </div>
            <div className="modal fade" tabIndex={-1} role="dialog" id="options-menu">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close position-absolute top-0 end-0 mt-1 me-1" data-dismiss="modal" />
                            <div className="d-flex gap-2 justify-content-center">
                                <DownloadBtn />
                                <LoadBtn />
                            </div>
                        </div>
                        <div className="modal-body py-4">
                            <div className="form-group d-flex mb-4">
                                <label htmlFor="sendFor" className="me-2">
                                    <i className="bi bi-whatsapp fs-4" />
                                </label>
                                <input type="text" id="sendFor" className="form-control" value={sendTo} placeholder={"Enviar para"} onChange={(e) => setSendTo(e.target.value)} />
                            </div>
                            <div className="d-flex justify-content-center gap-2">
                                <button type="button" className="btn btn-primary" disabled={listItems.length > 0 ? false : true} onClick={() => sendAll()}>
                                    <i className="bi bi-send-fill" /> Enviar tudo
                                </button>
                                <button type="button" className="btn btn-danger" disabled={warnedItems.length > 0 ? false : true} onClick={() => sendImportant()}>
                                    <i className="bi bi-send-exclamation-fill" /> Enviar importantes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}