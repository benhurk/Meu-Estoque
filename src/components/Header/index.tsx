import DownloadBtn from "../DownloadBtn";
import LoadBtn from "../LoadBtn";
import SendButton from "../SendButton";

export default function Header() {
    return (
        <header className="container py-4 bg-primary">
            <h1 className="text-center text-light mb-4">EZtoque</h1>
            <button type="button" className="btn btn-light text-primary d-block mx-auto" data-toggle="modal" data-target="#options-menu">
                    <i className="bi bi-list" />
            </button>
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
                            <div className="d-flex justify-content-center gap-2">
                                <SendButton sendMode="all" />
                                <SendButton sendMode="warn" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}