import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import { Data as AccountData, Variables as AccountVariables, accountQuery } from '../../../api/graphQL/account'

interface AccountProps {
  accountId: string;
}

const AccountDetailComponent: FC<AccountProps> = (props) => {
  const { accountId } = props;

  const {
    loading: isAccountFetching,
    error: fetchAccountError,
    data: account,
  } = useQuery<AccountData, AccountVariables>(accountQuery, {
    variables: { accountId },
  });

  if (!account) return null;

  return (
    <>
      <div>{account.account_by_pk?.identity}</div>
      <div>{account.account_by_pk?.account_id}</div>
      <div>Created on {new Date(account.account_by_pk?.timestamp).toLocaleString()}</div>
      <div>
        <span>Balance </span>
        <span>{account.account_by_pk?.free_balance || "unavailable"} (total) </span>
        <span>{account.account_by_pk?.locked_balance || "unavailable"} (locked) </span>
        <span>{account.account_by_pk?.available_balance || "unavailable"} (transferable) </span>
      </div>
    </>
  )
}

export default AccountDetailComponent
