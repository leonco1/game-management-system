// function countBattleships(battleField) {
//     let countOfBattleships=0
//     let length=battleField.length
//     for(let i=0;i<length;i++)
//     {
//         for(let j=0;j<length;j++)
//         {
            
//             if(battleField[i][j]==='X' && (battleField[i-1][j-1]!=='X'))
//             {
//                 let counter=1
//                 while(battleField[i][j+counter]==='X' && (j+counter<length/2 ||j+counter<length))
//                 {
//                     counter++
//                 }
//                while(battleField[i+counter][j]==='X' && i+counter<length)
//                 {
//                     counter++;
//                 }
//             countOfBattleships++
//             }

//         }
//         console.log(countOfBattleships)
//     }
//    return 0;
// }

// // DO NOT MODIFY THE CODE BELOW THIS LINE
//  var process;
// let input
// process.stdin.setEncoding('utf8');
// process.stdin.on('data', (data) => {
//     input = data.trim().split('\n');
// });

// process.stdin.on('end', () => {
//     const n = parseInt(input[0], 10);
//     const battleField: string[][] = input.slice(1).map(line => 
//         line.split(" ").map(char => char)
//     );

//     console.log(countBattleships(battleField));
// });