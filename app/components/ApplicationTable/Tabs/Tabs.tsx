import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import {useTableStore} from "~/components/ApplicationTable/tableStore";

const onChange = (key: 'paid' | 'unPaid') => {
    useTableStore.setState({
        tab: key,
    })
};

const items: TabsProps['items'] = [
    {
        key: 'paid',
        label: 'Оплаченные',
    },
    {
        key: 'unPaid',
        label: 'Не оплаченные',
    },
];


const PayTabs = () => {
    const { tab } = useTableStore();

    return <Tabs defaultActiveKey={tab} items={items} onChange={onChange as any} />
}

export default PayTabs;