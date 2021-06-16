import React, { useCallback, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import './CreateBox.css';

export type CreateBoxProps = {
    onCreate: (text: string) => Promise<void>;
    disabled: boolean;
};

const disableSubmission = (text: string) => !text.trim();

const CreatBox = ({ onCreate, disabled }: CreateBoxProps) => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const performCreation = useCallback(() => {
        const value = text?.trim();
        if (!!value) {
            setIsLoading(true);
            onCreate(value)
                .then(() => setText(''))
                .finally(() => setIsLoading(false));
        }
    }, [text, onCreate]);

    return (
        <div className={'CreateBox'}>
            <Input
                type={'text'}
                prefix={<CaretRightOutlined className="site-form-item-icon" />}
                placeholder="Add new TODO item here..."
                disabled={disabled || isLoading}
                allowClear={true}
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setText(e.target.value);
                }}
                onPressEnter={performCreation}
            />
            <Button
                type={'primary'}
                disabled={disableSubmission(text)}
                loading={isLoading}
                onClick={performCreation}
            >
                Create
            </Button>
        </div>
    );
};

export default CreatBox;
