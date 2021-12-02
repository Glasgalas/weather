import s from './Empty.module.css';

const Empty = () => {
  return (
    <div className={s.emptyWrap}>
      <div className={s.empt}>
        <p>First enter your query</p>
      </div>
    </div>
  );
};

export default Empty;
