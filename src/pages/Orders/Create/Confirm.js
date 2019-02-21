import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, Row, Col } from 'antd';
import router from 'umi/router';
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
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/order/info');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          const response = {
            orderDetailsResponses: {
              deviceEligibility: {
                coverageDuration: '3',
                deviceDateOfPurchase: '01/03/14',
                deviceId: '24741420XMN',
                partDescription: 'AppleCare Protection Plan for Display',
                partNumber: 'S3144LL/A',
                pocType: 'APOC',
                productDescription: 'Cinema Display (23-inch DVI Early 2007)',
                productStatement:
                  'AppleCare Protection Plan for Display extends service and support coverage to 3 years from the purchase date of the device.',
                purchaseMode: 'I',
                registeredDevice: '1',
                secondaryDisplay: '0',
                secondarySerialNumber: '',
                serialNumber: '24741420XMN',
              },
              orderConfirmation: {
                agreementNumber: '325111345019',
                appleCareSalesDate: '04/03/14',
                coverageDurationStatement: 'Ends on 01/03/16',
                partNumber: 'S3144LL/A',
                partType: 'AppleCare Protection Plan',
                pocType: 'APOC',
                purchaseMode: 'I',
                purchaseOrderNumber: '12345',
                termConditionURL: 'http://www.apple.com/legal/sales-support/',
                warningMessage:
                  'There was a problem validating the customer contact data provided.The AppleCare order will be processed without customer details.',
              },
            },
            transactionId: '23d7407e-bb52-42c7-9bb4-3fde9255126c-1397623074596',
          };
          dispatch({
            type: 'form/submitStepForm',
            payload: {
              ...values,
              ...response,
            },
          });
        }
      });
    };
    const verifyResult = data.orderDetailsResponses
      ? data.orderDetailsResponses.deviceEligibility
      : null;
    // const serialNumber = verifyResult ? verifyResult.deviceId : null;
    // const secondarySerialNumber = verifyResult ? verifyResult.secondarySerialNumber : null;
    // const invoiceSerialNumber = serialNumber
    //   ? serialNumber
    //   : '' + (secondarySerialNumber ? '+ ' + secondarySerialNumber : '');
    // const invoiceItemName = verifyResult ? verifyResult.productDescription : null;
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message={'This device is ELIGIBLE for ' + verifyResult.partDescription}
          style={{ marginBottom: 24 }}
        />
        <div className={styles.extra}>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="Device ID">
            {verifyResult.deviceId}{' '}
            {verifyResult.secondarySerialNumber ? '+ ' + verifyResult.secondarySerialNumber : ''}
          </Form.Item>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="Description">
            {verifyResult.productDescription}
          </Form.Item>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="Statement">
            {verifyResult.productStatement}
          </Form.Item>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="Purchase Date">
            {verifyResult.deviceDateOfPurchase}
          </Form.Item>
          <Row gutter={16}>
            <Col xl={8} lg={8} md={8} sm={24}>
              <Form.Item className={styles.stepFormText} label="Part Description">
                {verifyResult.partDescription}
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24}>
              <Form.Item className={styles.stepFormText} label="Part No.">
                {verifyResult.partNumber}
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24}>
              <Form.Item className={styles.stepFormText} label="Coverage Duration">
                {verifyResult.coverageDuration} years
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Registered Device">
                {verifyResult.registeredDevice}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Secondary Display">
                {verifyResult.secondaryDisplay}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider style={{ margin: '24px 0' }} />
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
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            Register Now
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            Back
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ConfirmOrder;
