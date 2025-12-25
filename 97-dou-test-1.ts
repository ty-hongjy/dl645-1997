/*
 * @Description: 
 * @Autor: hongjy
 * @Date: 2025-12-23 17:08:37
 * @LastEditors: hongjy
 * @LastEditTime: 2025-12-25 10:15:23
 */
// import DL645_1997_Core,  {DL645DataId, DL645ControlCode } from './97-dou-ctl-4';
// import DL645_1997_CommandBuilder,DL645_1997_Core,  {DL645DataId, DL645ControlCode } from './97-dou-ctl-4';
import DL645_1997_Core, { DL645DataId, DL645ControlCode, PowerProtectCommand,SwitchCommand } from './dl645-1997';

// ====================== 最终测试：生成和实际完全匹配的命令 ======================
if (require.main === module) {
  const dl645Core = new DL645_1997_Core(false); // false=不使用第二个68
  const meterAddress = '000048604296'; // 目标电表地址
  const dataId = DL645DataId.TOTAL_ACTIVE_ENERGY; // 总有功电能标识

  // 生成读命令
  const readCmdResult = dl645Core.buildReadCommand(meterAddress, dataId);
  console.log('=== 最终生成的读取总有功电能命令 ===');
  if (readCmdResult.success) {
    console.log('16进制（无空格）：', readCmdResult.commandHex); // 输出：6869BD9FB7FFFF010400000100F816
    console.log('16进制（带空格）：', readCmdResult.commandHexWithSpace); // 输出：68 69 BD 9F B7 FF FF 01 04 00 00 01 00 F8 16
    console.log('是否和实际一致：', readCmdResult.commandHex === '6869BD9FB7FFFF010400000100F816'); // 输出：true
  } else {
    console.error('命令生成失败：', readCmdResult.error);
  }
}