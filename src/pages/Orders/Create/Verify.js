import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider } from 'antd';
import router from 'umi/router';
import styles from '../style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ form }) => ({
  user: form.user,
}))
@Form.create()
class VerifyOrder extends React.PureComponent {
  render() {
    const { form, dispatch } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          const data = {
            orderDetailsResponses: {
              deviceEligibility: {
                coverageDuration: '3',
                deviceDateOfPurchase: '01/03/14',
                deviceId: values.serialNumber,
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
                serialNumber: values.serialNumber,
              },
            },
            transactionId: '90418dfb-6a38-4f32-a035-0ba5c86d8254-1398075330576',
          };
          dispatch({
            type: 'form/saveStepFormData',
            payload: data,
          });
          router.push('/order/confirm');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Alert
            showIcon
            message="Enter your hardware serial numbers to verify the device status"
            style={{ marginBottom: 24 }}
          />
          <Form.Item {...formItemLayout} label="Serial Number">
            {getFieldDecorator('serialNumber', {
              rules: [{ required: true, message: 'Serial Number' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
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
              Verify
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://support.apple.com/en-us/HT204308"
          >
            See how to find your serial number &gt;
          </a>
        </div>
      </Fragment>
    );
  }
}

export default VerifyOrder;
