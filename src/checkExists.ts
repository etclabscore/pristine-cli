import * as util from "util";
import * as fs from "fs";

const promisifiedFsAccess = util.promisify(fs.access);

const checkExists = async (p: string): Promise<boolean> => {
  try {
    await promisifiedFsAccess(p);
    return true;
  } catch (e) {
    return false;
  }
};

export default checkExists;
