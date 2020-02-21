import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes, query, stagger
} from '@angular/animations';

export const routerTransition = [

  trigger('routerTransition', [

    state('void', style({position: 'absolute', width: '100%', height: '100%', opacity: 0})),
    state('*', style({position: 'absolute', width: '100%', height: '100%', opacity: 1})),

    transition(':enter', [
      style({transform: 'translateY(20%)', opacity: 0}),
      animate('0.8s ease-in-out', style({transform: 'translateY(0%)', opacity: 1}))
    ]),

    /*transition(':leave', [  // before 2.1: transition('* => void', [
      style({transform: 'translateY(0%)'}),
      animate('0.8s ease-in-out', style({transform: 'translateY(-20%)', opacity: 0}))
    ])*/

  ]),

  trigger('posts', [
    transition('* => void', [

      query(':enter', style({opacity: 0}), {optional: true}),

      query(':enter', stagger('300ms', [
        animate('.6s ease-in', keyframes([
          style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
          style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
        ]))]), {optional: true})
    ])
  ]),

  trigger('delPost', [
    state('void', style({opacity: 0})),

    transition(':leave', [
      animate(2000)
    ])])
];
