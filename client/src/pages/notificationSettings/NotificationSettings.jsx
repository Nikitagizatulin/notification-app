import React, { useEffect } from 'react';
import {
  Typography,
  Form,
  Radio,
  TimePicker,
  Select,
  Input,
  Row,
  message,
  Col,
} from 'antd';

import {
  useGetNotificationDetailsQuery,
  useUpdateNotificationDetailsMutation,
} from '../../store/services/notificationService';
import MainLayoutComponent from '../../components/mainLayout/MainLayoutComponent';
import SubmitButton from '../../components/common/SubmitButton';
import {
  NotificationFormWrapper,
  NotificationDescription,
} from './NotificationSettingsStyles';

const { Title } = Typography;

const dayOptions = [
  { value: 'su', label: 'Sunday' },
  { value: 'mo', label: 'Monday' },
  { value: 'tu', label: 'Tuesday' },
  { value: 'we', label: 'Wednesday' },
  { value: 'th', label: 'Thursday' },
  { value: 'fr', label: 'Friday' },
  { value: 'sa', label: 'Saturday' },
];
const NotificationSettings = () => {
  const [form] = Form.useForm();
  const {
    data: nitificationSettingData,
    isLoading,
    isFetching,
  } = useGetNotificationDetailsQuery();
  const [
    updateNotificationDetails,
    {
      isError: isUpdateError,
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      error: updateError,
    },
  ] = useUpdateNotificationDetailsMutation();
  const selectedInterval = Form.useWatch('interval', form);

  const initialValues = {
    searchQuery: nitificationSettingData?.search_query,
    interval: 'hourly',
    // due: [
    //     dayjs(data?.assessment?.due_start_date),
    //     dayjs(data?.assessment?.due_end_date),
    // ],
  };

  useEffect(() => form.resetFields(), [nitificationSettingData, form]);

  useEffect(() => {
    if (updateSuccess) {
      message.success('Notification details updated successfully');
    }

    if (isUpdateError) {
      if (Array.isArray(updateError.data.error)) {
        updateError.data.error.forEach((el) => message.error(el.message));
      } else {
        message.error(updateError.data.error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLoading]);

  const onFinish = (values) => {
    debugger
    updateNotificationDetails(values);
  };

  return (
    <MainLayoutComponent>
      <NotificationFormWrapper>
        <Title level={2}>Manage Bid Notifications</Title>
        <NotificationDescription>
          Configure your email notification settings for relevant business bids.
        </NotificationDescription>
        <Form
          loading={isLoading || isFetching || updateLoading}
          initialValues={initialValues}
          form={form}
          name="nitification"
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Row gutter={[10, 0]}>
            <Col sm={16} xs={24}>
              <Form.Item
                name="searchQuery"
                label="Search Query"
                rules={[
                  {
                    max: 250,
                    min: 3,
                    required: true,
                    message: 'Please input search Query',
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Search Query" size="large" />
              </Form.Item>
            </Col>
            <Col sm={8} xs={24}>
              <Form.Item name="interval" label="Notification Interval" required>
                <Radio.Group buttonStyle="solid" size="large">
                  <Radio.Button value="hourly">Hourly</Radio.Button>
                  <Radio.Button value="daily">Daily</Radio.Button>
                  <Radio.Button value="weekly">Weekly</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 0]}>
            {selectedInterval === 'weekly' && (
              <Col sm={16} xs={24}>
                <Form.Item required name="days" label="Notification Day(s)">
                  <Select
                    size="large"
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Select day(s)"
                    options={dayOptions}
                  />
                </Form.Item>
              </Col>
            )}

            {(selectedInterval === 'daily' ||
              selectedInterval === 'weekly') && (
              <Col sm={8} xs={24}>
                <Form.Item name="time" label="Notification Time" required>
                  <TimePicker size="large" />
                </Form.Item>
              </Col>
            )}
          </Row>
          <SubmitButton type="primary" htmlType="submit">
            Save
          </SubmitButton>
        </Form>
      </NotificationFormWrapper>
    </MainLayoutComponent>
  );
};

export default NotificationSettings;
