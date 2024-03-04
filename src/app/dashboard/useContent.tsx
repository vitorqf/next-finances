import { fetchTransactions } from "@/actions/fetch-transactions";
import { Button } from "@/components/Button";
import { ModalCard } from "@/components/ModalCard";
import { ModalTransaction } from "@/components/ModalTransaction";
import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";
import { Category } from "@/models/Category";
import { Transaction } from "@/models/Transaction";
import { formatAmout } from "@/utils";
import { generateCsv, mkConfig } from "export-to-csv";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdCreditCard } from "react-icons/md";
import { TbRefresh } from "react-icons/tb";
import { Card as CardModel } from "../../models/Card";

export function useContent(cards: CardModel[], categories: Category[]) {
  const { user } = useAuth();
  const { setModalContent } = useModal();

  const [card, setCard] = useState<CardModel | undefined>(cards[0]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const total = useMemo(() => transactions?.length, [transactions]);
  const tabs = useMemo(() => ["Todas", "Entrada", "Saída"], []);
  const currentMonth = useMemo(() => moment(new Date()).toDate(), []);

  const handleFetchTransactions = useCallback(async () => {
    setLocalLoading(true);
    if (card && user?.accessToken) {
      const data = await fetchTransactions(
        card?.id,
        currentMonth,
        user?.accessToken,
      );
      if (data) {
        setTransactions(data.results);
      }
    }
    setLocalLoading(false);
  }, [card, user?.accessToken, currentMonth]);

  const handleExportToCSV = useCallback(() => {
    if (transactions) {
      const csvConfig = mkConfig({ useKeysAsHeaders: true });
      const csvData = transactions.map((transaction) => ({
        titulo: transaction.title,
        valor: formatAmout(transaction.amount),
        categoria: transaction.category.title,
        data: transaction.date,
      }));
      const csv = generateCsv(csvConfig)(csvData);
      const link = document.createElement("a");
      link.download = `${new Date().getTime()}-transactions.csv`;
      link.href = `data:text/csv;charset=utf-8,${csv}`;
      link.click();
    }
  }, [transactions]);

  const handleSetActiveTab = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  const handleOpenNewCardModal = useCallback(() => {
    setModalContent(<ModalCard />);
  }, [setModalContent]);

  const handleOpenNewTransactionModal = useCallback(() => {
    setModalContent(<ModalTransaction categories={categories} />);
  }, [categories, setModalContent]);

  const actions = useMemo(
    () => (
      <>
        <Button
          title="Ver extrato"
          variant="secondary"
          onClick={handleFetchTransactions}
          disabled={localLoading}
          icon={<TbRefresh size={20} />}
        />
        <Button
          title="Novo cartão"
          variant="secondary"
          onClick={handleOpenNewCardModal}
          icon={<MdCreditCard size={20} />}
        />
        <Button
          title="Adicionar transação"
          onClick={handleOpenNewTransactionModal}
        />
      </>
    ),
    [
      handleFetchTransactions,
      handleOpenNewCardModal,
      handleOpenNewTransactionModal,
      localLoading,
    ],
  );

  useEffect(() => {
    async function fetchData() {
      if (card && user?.accessToken) {
        const data = await fetchTransactions(
          card?.id,
          currentMonth,
          user?.accessToken,
        );
        if (data) {
          setTransactions(data.results);
        }
      }
    }
    fetchData();
  }, [card, user?.accessToken, currentMonth]);

  return {
    total,
    tabs,
    activeTab,
    search,
    card,
    transactions,
    actions,
    localLoading,
    handleSetActiveTab,
    handleExportToCSV,
    setSearch,
    setCard,
  };
}
