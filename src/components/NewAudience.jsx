import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Form,
  Row,
  Radio,
  Input,
  InputNumber,
  Tabs,
  Tooltip,
  Select
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import searchService from '../service/search';

const { Option } = Select;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const CreateNewAudienceForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});

  const [fbInterests, setFbInterests] = useState([]);
  const [liInterests, setLiInterests] = useState([]);
  const [ttInterests, setTtInterests] = useState([]);

  const [fbLocations, setFbLocations] = useState([]);
  const [liLocations, setLiLocations] = useState([]);
  const [ttLocations, setTtLocations] = useState([]);

  const onFieldsChange = (changedFields, allFields) => {
    console.log("/form changed/: ", changedFields, allFields);
    setFormData(allFields);
  }

  const onFinish = (values) => {
  }

  const onFinishFailed = (data) => {
  }

  const submit = () => {
    form.submit();
  }

  const onInterestSearch = () => {
    let debounceTimeout = 800;
    const issueSearch = (event) => {
      let query = event.target.value;
      searchService.searchFacebookInterest(query).then((fbResults) => setFbInterests(fbResults));
      searchService.searchTiktokInterest(query).then((ttResults) => setTtInterests(ttResults));
      searchService.searchLinkedinInterest(query).then((liResults) => setLiInterests(liResults));
    }
    return debounce(issueSearch, debounceTimeout);
  }

  const onLocationSearch = () => {
    let debounceTimeout = 800;
    const issueSearch = (event) => {
      let query = event.target.value;
      searchService.searchFacebookLocation(query).then((fbResults) => setFbLocations(fbResults));
      searchService.searchTiktokLocation(query).then((ttResults) => setTtLocations(ttResults));
      searchService.searchLinkedinLocation(query).then((liResults) => setLiLocations(liResults));;
    }
    return debounce(issueSearch, debounceTimeout);
  }


  return (
    <div className="w-full">
      <div className="rounded-lg bg-white p-4 w-full border">
        <h1 className="font-bold text-2xl mb-4">New Audience</h1>
        <Form
          form={form}
          onValuesChange={onFieldsChange}
          layout="vertical"
          name="createAudienceForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
      
          <Form.Item
            name="name"
            label="Audience name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="location"
            label="Locations"
            onChange={onLocationSearch()}
          >
            <Input />
          </Form.Item>

          <div className="flex space-x-4">
            <div className="w-1/3">
              <Form.Item
                name="facebook__locations"
                label="Facebook locations"
              >
                <Select mode="multiple" placeholder="Please select facebook specific interest">
                  {
                    fbLocations.map(
                      (matchInterest) =>
                      <Option key={matchInterest.key} value={JSON.stringify(matchInterest)}>{`${matchInterest.name}, ${matchInterest.region}, ${matchInterest.country_name}`}</Option>)
                  }
                </Select>
              </Form.Item>
            </div>

            <div className="w-1/3">
              <Form.Item
                name="linkedin__locations"
                label="Linkedin location"
              >
                  <Select mode="multiple" placeholder="Please select linkedin specific interest">
                    {
                      liLocations.map(
                        (matchInterest) =>
                        <Option key={matchInterest.urn} value={JSON.stringify(matchInterest)}>{matchInterest.name}</Option>)
                    }
                  </Select>
              </Form.Item>
            </div>

            <div className="w-1/3">
              <Form.Item
                name="tiktok__locations"
                label="Tiktok Locations"
              >
                <Select mode="multiple" placeholder="Please select tiktok specific interest">
                  {
                    ttLocations.map(
                      (matchInterest) =>
                      <Option key={matchInterest.document.id} value={JSON.stringify(matchInterest.document)}>{`${matchInterest.document.name}, ${matchInterest.document.region_code}`}</Option>)
                  }
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="interests"
            label="Interests"
            onChange={onInterestSearch()}
          >
            <Input />
          </Form.Item>

          <div className="flex space-x-4">
            <div className="w-1/3">
              <Form.Item
                name="facebook__interests"
                label="Facebook Interests"
              >
                <Select mode="multiple" placeholder="Please select facebook specific interest">
                  {
                    fbInterests.map(
                      (matchInterest) =>
                      <Option key={matchInterest.document.id} value={JSON.stringify(matchInterest.document)}>{matchInterest.document.name}</Option>)
                  }
                </Select>
              </Form.Item>
            </div>

            <div className="w-1/3">
              <Form.Item
                name="linkedin__interests"
                label="Linkedin Interests"
              >
                  <Select mode="multiple" placeholder="Please select linkedin specific interest">
                    {
                      liInterests.map(
                        (matchInterest) =>
                        <Option key={matchInterest.urn} value={JSON.stringify(matchInterest)}>{matchInterest.name}</Option>)
                    }
                  </Select>
              </Form.Item>
            </div>

            <div className="w-1/3">
              <Form.Item
                name="tiktok__interests"
                label="Tiktok Interests"
              >
                <Select mode="multiple" placeholder="Please select linkedin specific interest">
                  {
                    ttInterests.map(
                      (matchInterest) =>
                      <Option
                        key={matchInterest.document.id}
                        value={JSON.stringify(matchInterest.document)}>
                        {matchInterest.document.interest_category_name}
                      </Option>)
                  }
                </Select>
              </Form.Item>
            </div>
          </div>

        </Form>
        <div className="flex flex-col">
          <div className="mt-4 self-end space-x-2">
            <a href="#"><Button>Cancel</Button></a>
            <Button type="primary" onClick={submit}>Submit</Button>
          </div>
        </div>
        <div className="rounded-lg w-full text-left">
        <pre>
          {JSON.stringify(formData, null, 2)}
        </pre>
        </div>
      </div>
    </div>
  )
}


export default CreateNewAudienceForm;
