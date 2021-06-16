import React from 'react';
import Item from '../../models/item';
import Text from 'antd/es/typography/Text';
import { Button } from 'antd';
import { CheckCircleFilled, DeleteFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './ItemView.css';

export type ItemViewProps = {
    item: Item;
    onComplete: (id: string, completed: boolean) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    disabled: boolean;
};

const ItemView = ({ item, onDelete, onComplete, disabled }: ItemViewProps) => {
    return (
        <div className={'ItemView'}>
            <Text className={'ItemView__text'} disabled={item.completed}>
                {item.text}
            </Text>
            <Button
                type="link"
                icon={<CheckCircleFilled />}
                onClick={() => onComplete(item.id, !item.completed)}
                disabled={disabled}
                size={"large"}
            />
            <div className={"ItemView__action-divider"}/>
            <Button
                type="link"
                danger
                icon={<DeleteFilled />}
                onClick={() => onDelete(item.id)}
                disabled={disabled}
                size={"large"}
            />
        </div>
    );
};

export default ItemView;
