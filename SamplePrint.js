import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';
import {hsdLogo} from './dummy-logo';

const SamplePrint = () => {
  const [items, setItems] = useState([
    '2pcs Chicken',
    '3pcs of coke',
    '5pcs of sundae',
  ]);

  return (
    <View>
      <Text>Sample Print Instruction</Text>
      <View style={styles.btn}>
        <Button
          onPress={async () => {
            await BluetoothEscposPrinter.printBarCode(
              '123456789012',
              BluetoothEscposPrinter.BARCODETYPE.JAN13,
              3,
              120,
              0,
              2,
            );
            await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
          }}
          title="Print BarCode"
        />
      </View>
      <View style={styles.btn}>
        <Button
          onPress={async () => {
            await BluetoothEscposPrinter.printQRCode(
              'https://hsd.co.id',
              280,
              BluetoothEscposPrinter.ERROR_CORRECTION.L,
            ); //.then(()=>{alert('done')},(err)=>{alert(err)});
            await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
          }}
          title="Print QRCode"
        />
      </View>

      <View style={styles.btn}>
        <Button
          onPress={async () => {
            await BluetoothEscposPrinter.printerUnderLine(2);
            await BluetoothEscposPrinter.printText('Prawito Hudoro\r\n', {
              encoding: 'GBK',
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1,
            });
            await BluetoothEscposPrinter.printerUnderLine(0);
            await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
          }}
          title="Print UnderLine"
        />
      </View>

      <View style={styles.btn}>
        <Button
          title="Print Struk Belanja"
          onPress={async () => {
            try {
                const printRow = async (
                  columns,
                  aligns,
                  values,
                  options = {},
                ) => {
                  await BluetoothEscposPrinter.printColumn(
                    columns,
                    aligns,
                    values,
                    options,
                  );
                  await BluetoothEscposPrinter.printText('\r\n', {});
                };
              
                // Print other header content as needed
              
                // Print items
                await printRow(
                  [48],
                  [BluetoothEscposPrinter.ALIGN.CENTER],
                  ['Items'],
                  {widthtimes: 1},
                );
                await printRow(
                  [48],
                  [BluetoothEscposPrinter.ALIGN.LEFT],
                  ['====================='],
                  {},
                );
                for (const item of items) {
                    const itemValue = "500"; // Replace "500" with the actual value you want to display
                    const formattedItem = item.padEnd(20); // Adjust padding as needed
                    const formattedLine = `${formattedItem}${itemValue}\n`;
                    await BluetoothEscposPrinter.printText(formattedLine, {});
                }
                
                await printRow(
                  [48],
                  [BluetoothEscposPrinter.ALIGN.LEFT],
                  ['================'],
                  {},
                );
              
                // Print footer content and QR code as needed
              
                await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
              } catch (e) {
                alert(e.message || 'ERROR');
              }
              
          }}
        />
      </View>
    </View>
  );
};

export default SamplePrint;

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
  },
});
