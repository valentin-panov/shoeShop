// ! Я пытался вынести этот компонент в переиспользуемые для хедера и для каталога, но пока не смог разобраться,
// как в него правильно прокинуть функцию скрытия onBlur

// onBlur выстреливает раньше submit при нажатии на кнопку, хакнул таймаутом, хак мне не нравится

import React, { FormEvent, ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SearchIcon from './SearchIcon';
import { RootState } from '../../../store';
import { setSearch } from '../../../reducers/Search/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '4px 2px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '42px',
      borderRadius: '7px',
      boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: '10px',
    },
  })
);

export default function HeaderSearch(): ReactElement {
  const [searchFieldVisibility, setSearchFieldVisibility] = useState(false);
  const [searchString, setSearchString] = useState(useSelector((store: RootState) => store.search.searchString));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const changeSearchField = (payload: string): void => {
    setSearchString(payload);
  };

  const onSearchSubmit = (): void => {
    setSearchFieldVisibility(false);
    dispatch(setSearch(searchString));
    history.push('/catalog.html');
  };

  return (
    <>
      {searchFieldVisibility ? (
        <Paper
          component="form"
          className={classes.root}
          onSubmit={(event: FormEvent<HTMLDivElement>): void => {
            event.preventDefault();
            onSearchSubmit();
          }}
          onBlur={() => {
            setTimeout(() => {
              setSearchFieldVisibility(false);
            }, 300);
          }}
        >
          <InputBase
            id="searchFieldHeader"
            name="searchField"
            type="text"
            className={classes.input}
            placeholder=""
            inputProps={{ 'aria-label': 'search' }}
            autoFocus
            onInput={(event: FormEvent<HTMLDivElement>) => {
              changeSearchField((event.target as HTMLInputElement).value);
            }}
          />
          <Button type="submit">
            <SearchIcon />
          </Button>
        </Paper>
      ) : (
        <Button onClick={() => setSearchFieldVisibility(true)}>
          <SearchIcon />
        </Button>
      )}
    </>
  );
}
