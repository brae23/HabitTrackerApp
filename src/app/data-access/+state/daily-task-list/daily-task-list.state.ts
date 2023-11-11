import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  DailyTaskListStateModel,
  DefaultDailyTaskListState,
} from './daily-task-list-state.model';
import { Injectable } from '@angular/core';
import * as DailyTaskListActions from './daily-task-list-state.action';
import { Habit } from 'src/app/models/habit';
import { TaskList } from 'src/app/models/task-list';
import { IListItem } from 'src/app/models/i-list-item';
import {
  insertItem,
  patch,
  removeItem,
  updateItem,
} from '@ngxs/store/operators';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';
import { findListItemArray } from 'src/app/functions/find-list.function';
import { toTask } from 'src/app/functions/to-task.function';

@State<DailyTaskListStateModel>({
  name: 'dailytasklist',
  defaults: DefaultDailyTaskListState,
})
@Injectable()
export class DailyTaskListState {
  constructor() {}

  // Selectors
  @Selector()
  static getDailyTaskList(state: DailyTaskListStateModel) {
    return state.DailyTaskList;
  }

  // Actions
  @Action(DailyTaskListActions.LoadDailyTaskList)
  loadDailyTaskList(
    ctx: StateContext<DailyTaskListStateModel>,
    { userId }: DailyTaskListActions.LoadDailyTaskList,
  ) {
    const habit1: Habit = {
      id: 'habitId1',
      name: 'Habit 1 Name',
      priority: 6,
      completed: false,
      parentListId: 'listId1',
      createdByUserId: 'User1',
      recursOn: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      isChildTask: false,
    };

    const testList1: TaskList = {
      id: 'insetListId1',
      name: 'Test Inset List 1',
      description: 'Mock Description',
      createdDate: Date.now(),
      completed: false,
      isCollapsed: true,
      createdByUserId: 'User 1',
      isChildTask: false,
      listItems: [
        {
          id: 'taskId1',
          parentListId: 'insetListId1',
          name: 'Task 1 Name',
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId2',
          parentListId: 'insetListId1',
          name: 'Task 2 Name',
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId3',
          parentListId: 'insetListId1',
          name: 'Task 3 Name',
          completed: true,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId4',
          parentListId: 'insetListId1',
          name: 'Task 4 Name',
          completed: true,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId5',
          parentListId: 'insetListId1',
          name: 'Task 5 Name',
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
      ],
    };

    const testList2: TaskList = {
      id: 'insetListId2',
      name: 'Test Inset List 2',
      description: 'Mock Description',
      createdDate: Date.now(),
      completed: false,
      isCollapsed: true,
      createdByUserId: 'User 1',
      isChildTask: false,
      listItems: [
        {
          id: 'taskId1',
          parentListId: 'insetListId2',
          name: 'Task 1 Name',
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId2',
          parentListId: 'insetListId2',
          name: 'Task 2 Name',
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId3',
          parentListId: 'insetListId2',
          name: 'Task 3 Name',
          completed: true,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId4',
          parentListId: 'insetListId2',
          name: 'Task 4 Name',
          completed: true,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId5',
          parentListId: 'insetListId2',
          name: 'Task 5 Name',
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
      ],
    };

    const dailyTaskList = {
      id: 'dtListId1',
      name: 'Daily Task List 1',
      description: 'Mock Description',
      createdDate: Date.now(),
      completed: false,
      isCollapsed: false,
      priority: 0,
      totalTaskCount: 5,
      completedTaskCount: 2,
      createdByUserId: 'User 1',
      isChildTask: false,
      listItems: [
        {
          id: 'taskId1',
          parentListId: 'listId1',
          name: 'Task 1 Name',
          priority: 0,
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: false,
        },
        {
          id: 'taskId2',
          parentListId: 'listId1',
          name: 'Task 2 Name',
          priority: 1,
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: false,
        },
        {
          id: 'taskId3',
          parentListId: 'listId1',
          name: 'Task 3 Name',
          priority: 2,
          completed: true,
          createdByUserId: 'User 1',
          isChildTask: false,
        },
        {
          id: 'taskId4',
          parentListId: 'listId1',
          name: 'Task 4 Name',
          priority: 3,
          completed: true,
          createdByUserId: 'User 1',
          isChildTask: false,
        },
        testList1,
        testList2,
        {
          id: 'taskId5',
          parentListId: 'listId1',
          name: 'Task 5 Name',
          priority: 5,
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: false,
        },
        habit1,
      ],
    };
    ctx.patchState({ DailyTaskList: dailyTaskList });
  }

  @Action(DailyTaskListActions.UpdateListItem)
  updateListItem(
    ctx: StateContext<DailyTaskListStateModel>,
    { listItem }: DailyTaskListActions.UpdateListItem,
  ) {
    ctx.setState(
      patch<DailyTaskListStateModel>({
        DailyTaskList: patch<DailyTaskListStateModel['DailyTaskList']>({
          listItems: updateItem((x) => x.id === listItem.id, listItem),
        }),
      }),
    );
  }

  @Action(DailyTaskListActions.AddListItem)
  addListItem(
    ctx: StateContext<DailyTaskListStateModel>,
    { listItem }: DailyTaskListActions.AddListItem,
  ) {
    let newListItemIndex = ctx.getState().DailyTaskList.listItems.length + 1;
    ctx.setState(
      patch<DailyTaskListStateModel>({
        DailyTaskList: patch<DailyTaskListStateModel['DailyTaskList']>({
          listItems: insertItem<IListItem>(listItem, newListItemIndex),
        }),
      }),
    );
  }

  @Action(DailyTaskListActions.AddInsetListItem)
  addInsetListItem(
    ctx: StateContext<DailyTaskListStateModel>,
    { listItem, parentListId }: DailyTaskListActions.AddInsetListItem,
  ) {
    ctx.setState(
      patch<DailyTaskListStateModel>({
        DailyTaskList: patch<DailyTaskListStateModel['DailyTaskList']>({
          listItems: updateItem<any>(
            (x) => x.id === parentListId,
            patch({ listItems: insertItem(listItem) }),
          ),
        }),
      }),
    );
  }

  @Action(DailyTaskListActions.RemoveListItem)
  removeListItem(
    ctx: StateContext<DailyTaskListStateModel>,
    { listItemId }: DailyTaskListActions.RemoveListItem,
  ) {
    ctx.setState(
      patch<DailyTaskListStateModel>({
        DailyTaskList: patch<DailyTaskListStateModel['DailyTaskList']>({
          listItems: removeItem((x) => x.id === listItemId),
        }),
      }),
    );
  }

  @Action(DailyTaskListActions.RemoveInsetListItem)
  removeInsetListItem(
    ctx: StateContext<DailyTaskListStateModel>,
    { listItemId, parentListId }: DailyTaskListActions.RemoveInsetListItem,
  ) {
    console.log(listItemId, parentListId);
    console.log(ctx.getState());
    ctx.setState(
      patch<DailyTaskListStateModel>({
        DailyTaskList: patch<DailyTaskListStateModel['DailyTaskList']>({
          listItems: updateItem<any>(
            (x) => x.id === parentListId,
            patch({ listItems: removeItem<any>((x) => x.id === listItemId) }),
          ),
        }),
      }),
    );
  }

  @Action(DailyTaskListActions.UpdateListCollapsedState)
  updateListCollapsedState(
    ctx: StateContext<DailyTaskListStateModel>,
    {
      listItemId,
      collapsedState,
    }: DailyTaskListActions.UpdateListCollapsedState,
  ) {
    ctx.setState(
      patch<DailyTaskListStateModel>({
        DailyTaskList: patch<DailyTaskListStateModel['DailyTaskList']>({
          listItems: updateItem<any>(
            (x) => x.id === listItemId,
            patch({ isCollapsed: collapsedState }),
          ),
        }),
      }),
    );
  }

  @Action(DailyTaskListActions.UpdateListCompletedState)
  updateListCompletedState(
    ctx: StateContext<DailyTaskListStateModel>,
    {
      listItemId,
      completedState,
    }: DailyTaskListActions.UpdateListCompletedState,
  ) {
    ctx.setState(
      patch<DailyTaskListStateModel>({
        DailyTaskList: patch<DailyTaskListStateModel['DailyTaskList']>({
          listItems: updateItem<any>(
            (x) => x.id === listItemId,
            patch({ completed: completedState }),
          ),
        }),
      }),
    );
  }

  @Action(DailyTaskListActions.HandleItemIndexReorder)
  handleItemIndexReorder(
    ctx: StateContext<DailyTaskListStateModel>,
    { ev }: DailyTaskListActions.HandleItemIndexReorder,
  ) {
    let dailyTaskListState = cloneDeep(ctx.getState().DailyTaskList);
    let previousList = findListItemArray(
      dailyTaskListState,
      ev.previousContainer.id,
    );
    let listId = ev.container.id;

    if (ev.previousContainer === ev.container) {
      moveItemInArray(
        findListItemArray(dailyTaskListState, listId)!,
        ev.previousIndex,
        ev.currentIndex,
      );
    } else {
      transferArrayItem(
        previousList!,
        findListItemArray(dailyTaskListState, listId)!,
        ev.previousIndex,
        ev.currentIndex,
      );
      if (previousList!.length == 0) {
        dailyTaskListState.listItems.map((x) =>
          x.id == ev.previousContainer.id ? toTask(previousList) : x,
        );
      }
    }

    ctx.setState(
      patch<DailyTaskListStateModel>({
        DailyTaskList: dailyTaskListState,
      }),
    );
  }
}
