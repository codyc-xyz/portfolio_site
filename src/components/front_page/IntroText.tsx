const IntroText = () => {
  return (
    <div>
      <div className="grid grid-cols-12 grid-rows-12">
        <div
          className="col-start-1 col-end-10 text-3xl p-24"
          style={{ marginTop: `40px` }}
        >
          <p>Hi.</p>
          <p style={{ marginTop: `12px` }}>
            My name is Cody, I am a full-stack developer passionate about
            movies, philosophy and code.
          </p>
          <p style={{ marginTop: `12px` }}>
            This website is a continuously updating passion project meant to
            help you learn more about me.
          </p>
          <p style={{ marginTop: `12px` }}>
            I hope you have as much fun exploring it as I did making it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroText;
