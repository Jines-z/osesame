import React, { FC } from 'react'
import { Modal, Form, Input } from 'antd'
import cloneDeep from 'lodash/cloneDeep'

interface Props {
    visible: boolean;
    onOk: (res: any) => void;
    onCancel: (res: any) => void;
    value?: any;
}

const AddLogin: FC<Props> = ({ visible, onOk, onCancel, value }) => {

    const [form] = Form.useForm()
    const ok = (): void => {
        form.validateFields().then(res => {
            onOk && onOk(res)
        })
    }
    if (value) {
        form.setFieldsValue(cloneDeep(value))
    } else {
        form.resetFields()
    }

    return (
        <Modal
            title={value ? '编辑账号' : '添加账号'}
            visible={visible}
            getContainer={false}
            width={450}
            onOk={ok}
            onCancel={onCancel}
            okText='保存'
            cancelText='取消'
        >
            <Form
                name='addLogin'
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }}
            >
                <Form.Item
                    label='名字'
                    name='name'
                    rules={[{ required: true, message: '请输入名字' }]}
                >
                    <Input placeholder='账号所属的软件/网站名' />
                </Form.Item>
                <Form.Item
                    label='用户名'
                    name='username'
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input placeholder='邮箱/手机号/用户名' />
                </Form.Item>
                <Form.Item
                    label='密码'
                    name='password'
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input placeholder='请输入密码' />
                </Form.Item>
                <Form.Item
                    label='备注'
                    name='remark'
                >
                    <Input placeholder='请输入备注' />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddLogin
