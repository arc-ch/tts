import TextToSpeech from './TextToSpeech';

const BlogPost = () => {
  const text = `Text-to-speech feature is now available on relatively any website or blog. 
  It's a game changer that you can listen to the content instead of reading it. 
  Especially effective for people with visual or cognitive impairments or on the go.`;

  return (
    <div>
      <h1>My Blog Post</h1>
      <TextToSpeech text={text} />
      <p>{text}</p>
    </div>
  );
};

export default BlogPost;
