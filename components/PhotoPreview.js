const PhotoPreview = ({ imageURLs }) => {
  return (
    <div id='photo-preview'>
      {imageURLs.map((url, index) => {
        return <img key={index} alt='' src={url} />;
      })}
    </div>
  );
};

export default PhotoPreview;
