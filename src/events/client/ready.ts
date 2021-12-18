import Application from '../../components/application/application';
import { commands } from '../../lib/constants';

const ready = (client: Application) => {
  console.log(commands);
  console.log(`Logged in as ${client.user.tag}!`);
};
export default ready;
