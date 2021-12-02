import s from './Error.module.css';

const Error = () => {
  return (
    <div className={s.errorWrap}>
      <div className={s.err}>
        <p>City not found</p>
      </div>
    </div>
  );
};

export default Error;
