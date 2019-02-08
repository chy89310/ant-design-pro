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
            values,
            orderLookupResponse: {
              agreementNumber: '325012137000',
              appleCareSalesDate: '01/21/15',
              appleCareStatus: 'Active',
              coverageDuration: '2 years from the Date of Purchase',
              authStatus: '2',
              authStatusDesc: 'RECOVERED',
              createdDate: '01/21/15',
              creditDate: 'Not Available',
              creditMemo: 'Not Available',
              customerEmailId: 'noreply@apple.com',
              dateOfPurchase: '01/21/15',
              deviceId: 'C02M1560DTTN',
              IMEI: '990002239742550',
              incidentAvailable: 'Y',
              invoiceDate: 'Not Available',
              invoiceNumber: 'Not Available',
              limitedWarranty: 'Y',
              MEID: '99000223975550',
              monthlyPayment: 'Y',
              msaNumber: 'C03',
              oldDeviceID: 'C02M1507DTTN',
              oldIMEI: '990002239742497',
              oldMEID: '99000223975497',
              orderDescription: 'Order creation completed',
              orderStatus: '0',
              partDescription: 'AppleCare+ for iPhone',
              partNumber: 'S4576LL/A',
              purchaseOrderNumber: 'five501116000',
              serialNumber: 'C02M1560DTTN',
              shipTo: '0000065589',
              shipToName: 'TECH DATA PRODUCT',
              soldTo: '0000065589',
              soldToName: 'TECH DATA PRODUCT',
            },
            transactionId: '1c8950d7-2aef-4067-928e-4ef71c79ca7d-1423119710665',
          };
          dispatch({
            type: 'form/saveStepFormData',
            payload: data,
          });
          router.push('/cancel/confirm');
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Alert
            showIcon
            message="Get current AppleCare or AppleCare+ status before cancellation"
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
