import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  allDates: any[] = [];
  today: number = new Date().getDate()
  title = 'GSE Banking app';
  allWorkItems: any[] = [];
  cumulativePercentage: number = 0;
  isMinimized = false;

  ngOnInit(): void {
    this.generateAllDate();
    this.generateAllWorkItems();

    setInterval(() => {
      this.increasePercentageOfCompletion();
    }, 10000)
  }

  generateAllDate(): void {
    const date = this.today
    const firstDateOnRow = date - 9
    const lastDateOnRow = date + 7

    for (let x = firstDateOnRow; x < date; x++) {
      this.allDates.push(x)
    }
    for (let x = date; x <= lastDateOnRow; x++) {
      this.allDates.push(x)
    }
  }

  generateAllWorkItems(): void {
    const nameArray = ['Augustine', 'Mike', 'Esther', 'Samson']
    const departmentArray = ['Frontend', 'Backend', 'UI/UX', 'Tester']
    const colourArray = [
      ['rgb(199,73,0)','rgba(199,73,0,0.3)'],
      ['rgb(114,158,241)','rgba(114,158,241,0.3)'],
      ['rgb(47,206,0)','rgba(47,206,0,0.3)'],
      ['rgb(191,0,186)','rgba(191,0,186,0.3)'],
      ['rgb(201,0,0)','rgba(201,0,0,0.3)'],
      ['rgb(0,184,115)','rgba(0,184,115,0.3)'],
      ['rgb(96,0,172)','rgba(96,0,172,0.3)'],
    ]

    for (let x = 0; x < 10; x++) {
      const data = {
        name: nameArray[Math.floor(Math.random()*nameArray.length)],
        department: departmentArray[Math.floor(Math.random()*departmentArray.length)],
        background: colourArray[Math.floor(Math.random()*colourArray.length)],
        startingPoint: (100 / 17) * Math.floor(Math.random() * 15),
        duration: (100 / 17) * Math.floor(Math.random() * (10 - 3) + 3),
        percentageCompleted: Math.floor(Math.random() * 100),
      }
      this.allWorkItems.push(data)
    }

    this.calculateCumulativePercentage();
  }

  increasePercentageOfCompletion(): void {
      this.allWorkItems.filter(item => {
          if (item.percentageCompleted < 100) {
            const newPercentage = item.percentageCompleted + Math.floor(Math.random() * (30 - 10) + 10)
            item.percentageCompleted = newPercentage > 100 ? 100 : newPercentage
          }  else {
            item.percentageCompleted = 100
          }
          this.calculateCumulativePercentage();
      })
  }

  calculateCumulativePercentage(): void {
    let totalPercentage  = 0;
    this.allWorkItems.forEach(item => {
      totalPercentage = totalPercentage + item.percentageCompleted;
    })

    this.cumulativePercentage = Math.floor((totalPercentage / 100) * this.allWorkItems.length)
  }

  changeMenu(title: string): void {
    this.title = title
  }
}
