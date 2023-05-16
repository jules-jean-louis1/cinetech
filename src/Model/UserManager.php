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
    public function login(string $loginOrEmail, string $password)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT login, email, password FROM utilisateurs WHERE login = :loginOrEmail OR email = :loginOrEmail');
        $req->execute([
            ':loginOrEmail' => $loginOrEmail
        ]);
        $user = $req->fetch(\PDO::FETCH_ASSOC);
        if ($user === false) {
            return false;
        } else {
            if (password_verify($password, $user['password'])) {
                return $user;
            } else {
                return false;
            }
        }
    }
    public function getUserById($id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT login FROM utilisateurs WHERE id = :id');
        $req->execute([
            ':id' => $id
        ]);
        $user = $req->fetch();
        return $user;
    }
}