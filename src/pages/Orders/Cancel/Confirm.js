import React from 'react';
import { connect } from 'dva';
import { Form, Button, Divider, Row, Col, Popconfirm } from 'antd';
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
    const { data, dispatch, submitting } = this.props;
    const onPrev = () => {
      router.push('/cancel/info');
    };
    const onCancelOrder = () => {
      dispatch({
        type: 'form/saveStepFormData',
        payload: data,
      });
      router.push('/cancel/result');
    };
    const { orderLookupResponse, transactionId } = data;
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <div className={styles.extra}>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="Device ID">
            {orderLookupResponse.deviceId}
          </Form.Item>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="AppleCare Status">
            {orderLookupResponse.appleCareStatus ? orderLookupResponse.appleCareStatus : 'Unknown'}
          </Form.Item>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="Order Description">
            {orderLookupResponse.orderDescription}
          </Form.Item>
          <Row gutter={16}>
            <Col xl={8} lg={8} md={8} sm={24}>
              <Form.Item className={styles.stepFormText} label="Agreement No.">
                {orderLookupResponse.agreementNumber}
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24}>
              <Form.Item className={styles.stepFormText} label="Created Date">
                {orderLookupResponse.createdDate}
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24}>
              <Form.Item className={styles.stepFormText} label="AppleCare Sales Date">
                {orderLookupResponse.appleCareSalesDate}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xl={8} lg={8} md={8} sm={24}>
              <Form.Item className={styles.stepFormText} label="Coverage End Date">
                {orderLookupResponse.coverageEndDate}
                {orderLookupResponse.coverageEndDate ? orderLookupResponse.coverageDuration : ''}
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24}>
              <Form.Item className={styles.stepFormText} label="AppleCare Cancellation Date">
                {orderLookupResponse.appleCareCancellationDate}
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24}>
              <Form.Item className={styles.stepFormText} label="Cancellation Date">
                {orderLookupResponse.cancellationDate}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Credit Date">
                {orderLookupResponse.creditDate}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Credit Memo">
                {orderLookupResponse.creditMemo}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xl={6} lg={6} sm={12} xs={12}>
              <Form.Item className={styles.stepFormText} label="Invoice Date">
                {orderLookupResponse.invoiceDate}
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} sm={12} xs={12}>
              <Form.Item className={styles.stepFormText} label="Invoice No.">
                {orderLookupResponse.invoiceNumber}
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} sm={12} xs={12}>
              <Form.Item className={styles.stepFormText} label="Incident Available">
                {orderLookupResponse.incidentAvailable}
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} sm={12} xs={12}>
              <Form.Item className={styles.stepFormText} label="Limited Warranty">
                {orderLookupResponse.limitedWarranty}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xl={6} lg={6} sm={12} xs={12}>
              <Form.Item className={styles.stepFormText} label="Ship To">
                {orderLookupResponse.shipTo}
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} sm={12} xs={12}>
              <Form.Item className={styles.stepFormText} label="Ship To Name">
                {orderLookupResponse.shipToName}
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} sm={12} xs={12}>
              <Form.Item className={styles.stepFormText} label="Sold To">
                {orderLookupResponse.soldTo}
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} sm={12} xs={12}>
              <Form.Item className={styles.stepFormText} label="Sold To Name">
                {orderLookupResponse.soldToName}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Part Description">
                {orderLookupResponse.partDescription}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Part No.">
                {orderLookupResponse.partNumber}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Purchase Date">
                {orderLookupResponse.dateOfPurchase}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item className={styles.stepFormText} label="Purchase Order No.">
                {orderLookupResponse.purchaseOrderNumber}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item {...formItemLayout} className={styles.stepFormText} label="Transaction ID">
            {transactionId}
          </Form.Item>
        </div>
        <Divider style={{ margin: '24px 0' }} />
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
          <Popconfirm
            title="Are you sure cancelling this device AppleCare or AppleCare+ ?"
            onConfirm={onCancelOrder}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="danger"
              loading={submitting}
              disabled={orderLookupResponse.appleCareStatus !== 'Active'}
            >
              Cancel AppleCare Now
            </Button>
          </Popconfirm>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            Back
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ConfirmOrder;
