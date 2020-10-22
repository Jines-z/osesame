import React, { FC } from 'react'
import { Modal, Form, Input } from 'antd'
import cloneDeep from 'lodash/cloneDeep'

interface Props {
    visible: boolean;
    onOk: (res: any) => void;
    onCancel: (res: any) => void;
    value?: any;
}

const AddNote: FC<Props> = ({ visible, onOk, onCancel, value }) => {

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
            title={value ? '编辑笔记' : '添加笔记'}
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
                    label='标题'
                    name='title'
                    rules={[{ required: true, message: '请输入标题' }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item
                    label='内容'
                    name='content'
                    rules={[{ required: true, message: '请输入内容' }]}
                >
                    <Input.TextArea
                        placeholder='请输入'
                        rows={6}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddNote
