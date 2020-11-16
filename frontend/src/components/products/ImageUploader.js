import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { uploadImage } from '../../actions/productsActions'
import { setAlert } from '../../actions/alertsActions'

const ImageUploader = ({ productId, uploadImage, disableUpload, setAlert }) => {

    const [file, setFile] = useState('')

    const onFileUpload = e => {
        setFile(e.target.files[0])
    }

    const uploadFile = e => {
        e.preventDefault();
        const formData = new FormData();
        if (file === '') {
            setAlert('Please upload an image', 'danger')
        } else {
            formData.append('file', file);
            uploadImage(formData, productId)
            setAlert('Image updated successfuly', 'success')
        }
    }

    return (
        <form className='form form--image' onSubmit={uploadFile}>
            <label className="custom-file-upload my-1">
                <input type="file"
                    className='input'
                    onChange={onFileUpload}
                    accept='image/webp'
                />
                <i className="fas fa-cloud-upload-alt mx-1"></i>
                Upload Image
            </label>
            <input type="submit" value="Confirm Image" disabled={disableUpload} className='btn btn--lg btn--block' />
        </form>
    )
}


export default connect(null, { uploadImage, setAlert })(ImageUploader)
