import { View, Text, Button } from 'react-native'
import React from 'react'
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';

const invoice = () => {
  return (
    <View >
    <Button
      title="Print Receipt"
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
  )
}

export default invoice