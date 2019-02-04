import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from '../style.less';

@connect(({ form }) => ({
  data: form.step,
}))
class OrderResult extends React.PureComponent {
  render() {
    const { data } = this.props;
    const onFinish = () => {
      router.push('/order/info');
    };
    // const { orderDetailsResponses, customerEmail, storeEmail } = data;
    const { orderDetailsResponses } = data;
    const { deviceEligibility, orderConfirmation } = orderDetailsResponses;
    const { serialNumber, secondarySerialNumber } = deviceEligibility;
    const deviceId = serialNumber + secondarySerialNumber ? ' ' + secondarySerialNumber : '';
    const information = (
      <div className={styles.extra}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Device ID:
          </Col>
          <Col xs={24} sm={16}>
            {deviceId}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Order Number:
          </Col>
          <Col xs={24} sm={16}>
            {orderConfirmation.purchaseOrderNumber}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Part Type:
          </Col>
          <Col xs={24} sm={16}>
            {orderConfirmation.partType}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Part No.:
          </Col>
          <Col xs={24} sm={16}>
            {orderConfirmation.partNumber}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Coverage Duration Statement:
          </Col>
          <Col xs={24} sm={16}>
            {orderConfirmation.coverageDurationStatement}
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary">Send POC to customer</Button>
        <Button onClick={onFinish}>Register another device</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="Done"
        description="AppleCare Registration is successful"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default OrderResult;
