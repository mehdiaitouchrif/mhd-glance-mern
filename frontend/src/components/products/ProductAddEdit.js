import React from 'react'
import ImageUploader from '../products/ImageUploader';

const ProductAddEdit = ({ data, disableUpload }) => {
    const { image, _id, name, size, description, inStock } = data;

    return (
        <div className="productAddEdit">
            <div className="productAddEdit__head">
                <img src={`/uploads/${image}`} alt="Product Image" />
                <ImageUploader disableUpload={disableUpload} productId={_id} />
            </div>
            <div className="productAddEdit__text">
                <div>
                    <p><strong>Name:</strong></p>
                    <p className="lead">{name}</p>
                </div>
                <div>
                    <p><strong>Description</strong>:</p>
                    <p>{description}</p>
                </div>
                <div className="flex-row">
                    <p><strong>Sizes</strong></p>
                    <p>{size.join(', ')}</p>
                </div>
                <div className="flex-row">
                    <p><strong>inStock:</strong></p>
                    <p>{inStock}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductAddEdit
