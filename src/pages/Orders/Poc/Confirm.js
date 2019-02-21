import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, Row, Col } from 'antd';
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

@connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))
@Form.create()
class ConfirmOrder extends React.PureComponent {
  render() {
    const { form, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { pocContentResponse } = data;
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          alert(values);
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <div className={styles.extra}>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="Device ID">
            {pocContentResponse.deviceId}
            {pocContentResponse.displaySerialNumber
              ? '+ ' + pocContentResponse.displaySerialNumber
              : ''}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            className={styles.stepFormText}
            label="Product Description"
          >
            {pocContentResponse.productDescription}
          </Form.Item>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="Product Statement">
            {pocContentResponse.productStatement}
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="AppleCare Sales Date">
                {pocContentResponse.appleCareSalesDate}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Coverage Duration">
                {pocContentResponse.coverageDurationStatement}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Part Description">
                {pocContentResponse.partDescription}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Part No.">
                {pocContentResponse.partNumber}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Purchase Date">
                {pocContentResponse.dateOfPurchase}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Purchase Order No.">
                {pocContentResponse.purchaseOrderNumber}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider style={{ margin: '40px 0 24px' }} />
        <Alert
          closable
          showIcon
          message="Enter customer email to proceed with order creation"
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
          <Button type="primary" onClick={onValidateForm}>
            Register Now
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ConfirmOrder;
