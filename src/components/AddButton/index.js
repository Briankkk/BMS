import {Button,Icon} from 'antd';
import styles from './index.less';

const AddButton = ({handleOnClick}) =>(
  <div>
    <Button icon="plus" className={styles.extraContentButton} type="primary" onClick={handleOnClick}>
      新增
    </Button>
  </div>
);


export default AddButton;
