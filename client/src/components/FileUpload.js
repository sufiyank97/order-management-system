import React, { useState } from 'react'
import axios from '../config/axios'
const FileUpload = (props) => {
    const [state, setState] = useState({ file: '', isFormat: false, err: '', loading: false })

    const handleFile = (e) => {
        if (e.target.files.length > 0) {

            if (e.target.files[0].name.includes('.csv')) {
                const file = e.target.files
                setState({ ...state, file: file[0], isFormat: false, err: null })
            }
            else {
                setState({ ...state, isFormat: true, err: 'File Format must be CSV' })
            }
        }
        else {
            setState({ ...state, file: '' })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (state.isFormat) {
            setState({ ...state, err: 'File Format must be CSV' })
        }
        else if (state.file === '') {
            setState({ ...state, err: 'Please upload a File.' })
        }
        else {

            setState({ ...state, loading: !state.loading, err: null })

            console.log(state)
            const formData = new FormData()
            console.log(formData)
            formData.append('file', state.file)
            const response = await axios.post('/upload', formData)
            try {
                const data = response.data
                props.handleData(data)
                setState({ ...state, loading: false, err: null })
            }
            catch (err) {
                console.log(err)
                setState({ ...state, loading: false, err: `${err},File is not Supported.` })
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label><strong>Upload-File:</strong>
                    <input type="file" onChange={handleFile} />
                </label>
                <input type="submit" className="btn btn-primary ml-2" disabled={state.isFormat} />
            </form>
            {(state.loading) ?
                <h4 style={{ textAlign: 'center', color: 'green' }}>Please wait,The file is being processed.</h4> : (state['err']) ?
                    <h4 style={{ textAlign: 'center', color: 'red' }}>{state.err}</h4> : null}
        </>
    )
}

export default FileUpload
