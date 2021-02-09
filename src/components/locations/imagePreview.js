import React from "react";
import PropTypes from "prop-types";

const ImagePreview = ({ imagefile, editImagefile }) =>
  imagefile ? (imagefile.map(({ name, preview, size }) => (
    <div key={name} className="render-preview">
      {console.log("PREVIEW:" + editImagefile)}
      <div className="image-container">
        <img src={preview ? preview : editImagefile} alt={name} />
      </div>
      {/* <div className="details">
        {name} - {(size / 1024000).toFixed(2)}MB
      </div> */}
    </div>
  )))
  : (
    // imagefile.map(({ name, preview, size }) => (
    <div key={name} className="render-preview">
      {console.log("PREVIEW:" + editImagefile)}
      <div className="image-container">
        <img src={editImagefile} alt={name} />
      </div>
      {/* <div className="details">
        {name} - {(size / 1024000).toFixed(2)}MB
      </div> */}
    </div>
  // ))
  )

ImagePreview.propTypes = {
  imagefile: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};

export default ImagePreview;
