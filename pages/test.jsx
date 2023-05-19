import React, { useState } from 'react';
import { Upload, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ImageField = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setImage(imageUrl);
    }
  };

  return (
    <div className="form-group my-2">
      <Space direction="vertical">
        <Upload
          name="image"
          action="/upload"
          listType="picture-card"
          onChange={handleImageChange}
        >
          <Button icon={<UploadOutlined />}/>
        </Upload>
        {image && (
          <div style={{ width: '100px' }}>
            <img src={image} alt="Selected" style={{ maxWidth: '100%' }} />
          </div>
        )}
      </Space>
    </div>
  );
};

export default ImageField;
