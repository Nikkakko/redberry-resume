import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

type PersonalInfo = {
  სახელი: string;
  გვარი: string;
  ჩემ_შესახებ: string;
  მეილი: string;
  ტელეფონი: string;
};

type ExperienceInfo = {
  id?: number;
  თანამდებობა: string;
  დამსაქმებელი: string;
  დაწყების_თარიღი: string;
  დამთავრების_თარიღი: string;
  აღწერა: string;
};

type EducationInfo = {
  id?: number;
  სასწავლებელი: string;
  ხარისხი: string;
  დამთავრების_თარიღი: string;
  აღწერა: string;
};

// Define a type for the slice state
interface resumeState {
  personalInfo: {
    სახელი: string;
    გვარი: string;
    ჩემ_შესახებ: string;
    მეილი: string;
    ტელეფონი: string;
  };

  experienceInfoList: ExperienceInfo[];

  educationInfoList: EducationInfo[];

  uploadFile: File | null;

  isFinished: boolean;
}

// Define the initial state using that type
const initialState: resumeState = {
  personalInfo: {
    სახელი: '',
    გვარი: '',
    ჩემ_შესახებ: '',
    მეილი: '',
    ტელეფონი: '',
  },

  experienceInfoList: [
    {
      id: 0,
      თანამდებობა: '',
      დამსაქმებელი: '',
      დაწყების_თარიღი: '',
      დამთავრების_თარიღი: '',
      აღწერა: '',
    },
  ],

  educationInfoList: [
    {
      id: 0,
      სასწავლებელი: '',
      ხარისხი: '',
      დამთავრების_თარიღი: '',
      აღწერა: '',
    },
  ],

  uploadFile: null,
  isFinished: false,
};

export const resumeSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },

    setFinished: (state, action: PayloadAction<boolean>) => {
      state.isFinished = action.payload;
    },

    setUploadFile: (state, action: PayloadAction<File | null>) => {
      state.uploadFile = action.payload;
    },

    setExperienceInfo: (state, action: PayloadAction<ExperienceInfo>) => {
      state.experienceInfoList = state.experienceInfoList.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    },

    setEducationInfo: (state, action: PayloadAction<EducationInfo>) => {
      state.educationInfoList = state.educationInfoList.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    },

    addEducationInfo: state => {
      //added new education info and increase id by 1
      const prevInfo = [...state.educationInfoList];
      const lastId = prevInfo[prevInfo.length - 1].id || 0;
      const newInfo = {
        id: lastId + 1,
        სასწავლებელი: '',
        ხარისხი: '',
        დამთავრების_თარიღი: '',
        აღწერა: '',
      };
      state.educationInfoList = [...state.educationInfoList, newInfo];
    },

    addExperienceInfo: state => {
      //added new experience info and increase id by 1
      const prevInfo = [...state.experienceInfoList];
      const lastId = prevInfo[prevInfo.length - 1].id || 0;
      const newInfo = {
        id: lastId + 1,
        თანამდებობა: '',
        დამსაქმებელი: '',
        დაწყების_თარიღი: '',
        დამთავრების_თარიღი: '',
        აღწერა: '',
      };
      state.experienceInfoList = [...prevInfo, newInfo];
    },

    clearResume: state => {
      state.personalInfo = {
        სახელი: '',
        გვარი: '',
        ჩემ_შესახებ: '',
        მეილი: '',
        ტელეფონი: '',
      };

      state.experienceInfoList = [
        {
          id: 0,
          თანამდებობა: '',
          დამსაქმებელი: '',
          დაწყების_თარიღი: '',
          დამთავრების_თარიღი: '',
          აღწერა: '',
        },
      ];

      state.educationInfoList = [
        {
          id: 0,
          სასწავლებელი: '',
          ხარისხი: '',
          დამთავრების_თარიღი: '',
          აღწერა: '',
        },
      ];

      state.uploadFile = null;
      state.isFinished = false;
    },
  },
});

export const {
  setPersonalInfo,
  setUploadFile,
  setExperienceInfo,
  addExperienceInfo,
  setEducationInfo,
  addEducationInfo,
  setFinished,

  clearResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
