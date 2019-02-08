import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert } from 'antd';
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
            values,
            pocContentResponse: {
              agreementNumber: '325033333333',
              appleCareSalesDate: '07/12/12',
              dateOfPurchase: '07/12/12',
              deviceId: 'C02XXXC02XXXXX',
              displaySerialNumber: 'C02C02XXXXXXNDKQ5F2GC',
              partDescription: 'AppleCare+ for iPhone',
              partNumber: 'S3142LL/A',
              purchaseOrderNumber: 'PO/50NO092',
              serialNumber: 'C02XXXC02XXXXX',
              productDescription: 'iPhone 6',
              productStatement:
                'AppleCare+ for iPhone extends service and support coverage to 2 years from the purchase date of the device, and includes coverage for up to 2 incidents of accidental damage from handling, each subject to a service fee of $29 for screen damage, or $99 for all other damage plus applicable sales tax.',
              coverageDurationStatement: 'Ends on 07/11/15',
              partType: 'AppleCare Protection Plan',
              termConditionURL: 'http://www.apple.com/legal/sales-support/',
            },
            transactionId: '6f85895e-5feb-4dc3-b0dd-000fb89b2bd5-1424893821356',
          };
          dispatch({
            type: 'form/saveStepFormData',
            payload: data,
          });
          router.push('/poc/confirm');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Alert
            showIcon
            message="Enter your hardware serial numbers to get the POC"
            style={{ marginBottom: 24 }}
          />
          <Form.Item {...formItemLayout} label="Serial Number">
            {getFieldDecorator('serialNumber', {
              rules: [{ required: true, message: 'Enter your hardware serial numbers to lookup' }],
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
      </Fragment>
    );
  }
}

export default VerifyOrder;
