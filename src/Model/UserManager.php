<?php

namespace App\Model;

class UserManager extends AbstractDatabase
{
    public function verifyLogin($login)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT login FROM utilisateurs WHERE login = :login');
        $req->execute(['login' => $login]);
        $user = $req->fetchAll(\PDO::FETCH_ASSOC);
        if (count($user) > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function verifyEmail($email)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT email FROM utilisateurs WHERE email = :email');
        $req->execute(['email' => $email]);
        $user = $req->fetchAll(\PDO::FETCH_ASSOC);
        if (count($user) > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function register($email, $login, $password)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('INSERT INTO utilisateurs (login, email, password, created_at) VALUES (:login, :email, :password, NOW())');
        $req->execute([
            'login' => $login,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT)
        ]);
    }
}