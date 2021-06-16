import React from 'react';

import { Button } from 'antd';
import 'antd/dist/antd.css';
import './SubmitButton.css'

export type Props = {
    showLoading: boolean;
    children?: React.ReactNode;
};

const SubmitButton = ({ showLoading, children }: Props) => (
    <Button type="primary" htmlType="submit" className="SubmitButton" loading={showLoading}>
        {children}
    </Button>
);

export default SubmitButton;
