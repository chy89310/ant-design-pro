import React from 'react';
import { connect } from 'dva';
import { Button, Form, Alert, Input, notification } from 'antd';
import styles from '../style.less';

const formItemLayout = {
  labelCol: {
    xl: { span: 5 },
    lg: { span: 5 },
    md: { span: 5 },
  },
  wrapperCol: {
    xl: { span: 19 },
    lg: { span: 19 },
    md: { span: 19 },
  },
};

@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class OrderResult extends React.PureComponent {
  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields(err => {
        if (!err) {
          notification.open({
            message: 'Cancellation successful',
            description: 'Send Cancellation Certificate to customer successfully!',
          });
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          type="success"
          showIcon
          message="AppleCare Cancellation is successful"
          style={{ marginBottom: 24 }}
        />
        <Alert
          closable
          showIcon
          message="Enter customer email to send the cancellation certificate"
          style={{ marginBottom: 24 }}
        />
        <Form.Item {...formItemLayout} label="Customer Email">
          {getFieldDecorator('customerEmail', {
            rules: [
              { required: true, message: 'Customer Email' },
              { type: 'email', message: 'Please enter a valid email address' },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Store Email">
          {getFieldDecorator('storeEmail', {
            rules: [
              { required: true, message: 'Store Email' },
              { type: 'email', message: 'Please enter a valid email address' },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            Send Cancellation Certificate to customer
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default OrderResult;
