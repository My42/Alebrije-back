import info from '../constants/alebrijeInfo';

const checkTableNumber = (number: number): Boolean => number > 0 && number <= info.numberOfTables;

export default checkTableNumber;
