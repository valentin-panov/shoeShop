import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
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
      background: 'transparent',
    },
  })
);

export default function SearchField(): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const storeSearchString = useSelector((store: RootState) => store.search.searchString);
  const [searchString, setSearchString] = useState(storeSearchString);

  const changeSearchField = (payload: string): void => {
    setSearchString(payload);
  };

  const onSearchSubmit = (): void => {
    dispatch(setSearch(searchString));
  };

  const onSearchClear = (): void => {
    changeSearchField('');
    dispatch(setSearch(''));
  };

  useEffect(() => {
    setSearchString(storeSearchString);
  }, [dispatch, storeSearchString]);

  return (
    <>
      <Paper
        component="form"
        className={classes.root}
        onSubmit={(event: FormEvent<HTMLDivElement>): void => {
          event.preventDefault();
          onSearchSubmit();
        }}
      >
        <InputBase
          id="searchField"
          name="searchField"
          type="text"
          className={classes.input}
          placeholder=""
          inputProps={{ 'aria-label': 'search' }}
          autoFocus
          value={searchString}
          onInput={(event: FormEvent<HTMLDivElement>) => {
            changeSearchField((event.target as HTMLInputElement).value);
          }}
        />
        {searchString && (
          <Button
            onClick={() => {
              onSearchClear();
            }}
          >
            <CloseIcon />
          </Button>
        )}
      </Paper>
    </>
  );
}
