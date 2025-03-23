import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    children: React.ReactNode;
};

export default function Portal({ children }: Props) {
    const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const node = document.createElement('div');
        document.body.appendChild(node);
        setPortalNode(node);

        return () => {
            document.body.removeChild(node);
        };
    }, []);

    if (!portalNode) return null;

    return createPortal(children, portalNode);
}
