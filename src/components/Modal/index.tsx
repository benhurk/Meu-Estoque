type Props = {
    elementId: string;
    children: React.ReactNode;
}

export default function Modal({elementId, children}: Props) {
    return (
        <div className="modal fade" id={elementId} role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close position-absolute top-0 end-0 mt-1 me-1" data-dismiss="modal" />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}