import { useEffect, useState } from 'react';
import { Form } from 'react-router';

export function DisablePreviewMode() {
    // const [show, setShow] = useState(true);

    // useEffect(() => {
    //     setShow(window === window.parent && !window.opener);
    // }, []);

    // if (show) {
    //     return null;
    // }

    return (
        <Form action="/api/preview-mode/disable" method="post">
            <button type="submit">Exit Preview Mode</button>
        </Form>
    );
}
