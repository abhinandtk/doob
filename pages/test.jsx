import React, { useEffect, useState } from 'react';
import { Upload, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;


const ImageField = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setImage(imageUrl);
    }
  };
  const [liveTime, setLiveTime] = useState('');
  useEffect(() => {
    const startDate = moment('2023-05-27', 'YYYY-MM-DD'); // Update with your match start date
    const startTime = moment('11:30:00', 'HH:mm:ss'); // Update with your match start time
  
    // Combine the start date and time into a single moment object
    const startDateTime = startDate.clone().set({
      hour: startTime.hours(),
      minute: startTime.minutes(),
      second: startTime.seconds(),
    });
  
    // Check if the match date is today
    const isMatchToday = startDateTime.isSame(moment(), 'day');
  
    if (!isMatchToday) {
      setLiveTime('00:00');
      return;
    }
  
    const interval = setInterval(() => {
      const currentTime = moment();
      const diff = moment.duration(Math.abs(startDateTime.diff(currentTime)));
      const totalMinutes = Math.floor(diff.asMinutes());
      const minutes = totalMinutes;
      const seconds = diff.seconds();
  
      if (totalMinutes >= 100) {
        clearInterval(interval);
        setLiveTime('90:00');
      } else {
        setLiveTime(`${minutes}:${seconds}`);
      }
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  
  
  
  


  return (
    // <div className="form-group my-2">
    //   <Space direction="vertical">
    //     <Upload
    //       name="image"
    //       action="/upload"
    //       listType="picture-card"
    //       onChange={handleImageChange}
    //     >
    //       <Button icon={<UploadOutlined />}/>
    //     </Upload>
    //     {image && (
    //       <div style={{ width: '100px' }}>
    //         <img src={image} alt="Selected" style={{ maxWidth: '100%' }} />
    //       </div>
    //     )}
    //   </Space>
    // </div>
    <div>
      <div>
      <h1>Live Match Time:</h1>
      <p>{liveTime}</p>
    </div>
      <div style={{backgroundColor:''}}>fg
      {/* <div style={{backgroundColor:'red',width:'100%'}}>abcd</div> */}


    <Tabs className="custom-tabs"  defaultActiveKey="1">
      <TabPane tab="Tournaments" key="1">
        {/* Content of Tab Pane 1 */}
      </TabPane>
      <TabPane tab="Ranks" key="2">
        {/* Content of Tab Pane 2 */}
      </TabPane>
    </Tabs>
    </div>
    </div>


  );
};

export default ImageField;
